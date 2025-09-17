// YouTube API 서비스
interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      maxres?: { url: string };
      high?: { url: string };
      medium: { url: string };
      default: { url: string };
    };
    publishedAt: string;
    channelTitle: string;
  };
}

interface YouTubeAPIResponse {
  items: YouTubeVideo[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

class YouTubeService {
  private apiKey: string;
  private channelId: string;
  private baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';
    this.channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || '';
  }

  // 채널의 최신 동영상 가져오기 (Shorts 제외)
  async getLatestVideos(maxResults: number = 10): Promise<YouTubeVideo[]> {
    if (!this.apiKey || !this.channelId) {
      console.warn('YouTube API 키 또는 채널 ID가 설정되지 않았습니다.');
      return this.getFallbackVideos();
    }

    try {
      // 1단계: 최신 동영상들을 많이 가져오기
      const searchUrl = `${this.baseUrl}/search?key=${this.apiKey}&channelId=${this.channelId}&part=snippet&order=date&maxResults=50&type=video`;
      const searchResponse = await fetch(searchUrl);
      
      if (!searchResponse.ok) {
        throw new Error(`YouTube API 요청 실패: ${searchResponse.status}`);
      }

      const searchData: YouTubeAPIResponse = await searchResponse.json();
      
      if (!searchData.items || searchData.items.length === 0) {
        return this.getFallbackVideos();
      }

      // 2단계: 각 비디오의 상세 정보 가져오기 (재생시간 포함)
      const videoIds = searchData.items.map(item => item.id.videoId).join(',');
      const detailsUrl = `${this.baseUrl}/videos?key=${this.apiKey}&id=${videoIds}&part=snippet,contentDetails`;
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();

      if (!detailsData.items) {
        return this.getFallbackVideos();
      }

      // 3단계: Shorts 필터링 (60초 이하 제외)
      const longFormVideos = detailsData.items
        .filter((video: any) => {
          const duration = video.contentDetails?.duration;
          if (!duration) return true; // duration 정보가 없으면 포함
          
          // PT1M = 1분, PT59S = 59초 등의 ISO 8601 duration 파싱
          const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
          if (!match) return true;
          
          const minutes = parseInt(match[1] || '0');
          const seconds = parseInt(match[2] || '0');
          const totalSeconds = minutes * 60 + seconds;
          
          return totalSeconds > 60; // 60초 초과인 것만 포함 (Shorts 제외)
        })
        .slice(0, maxResults)
        .map((video: any) => ({
          id: { videoId: video.id },
          snippet: video.snippet
        }));

      return longFormVideos.length > 0 ? longFormVideos : this.getFallbackVideos();
    } catch (error) {
      console.error('YouTube API 호출 중 오류:', error);
      return this.getFallbackVideos();
    }
  }

  // 인기 동영상 가져오기 (실제 조회수 기준, Shorts 제외)
  async getPopularVideos(maxResults: number = 4): Promise<YouTubeVideo[]> {
    if (!this.apiKey || !this.channelId) {
      return this.getFallbackVideos().slice(0, maxResults);
    }

    try {
      // 1단계: 채널의 최신 동영상들을 많이 가져오기 (Shorts 포함)
      const searchUrl = `${this.baseUrl}/search?key=${this.apiKey}&channelId=${this.channelId}&part=snippet&order=date&maxResults=50&type=video`;
      const searchResponse = await fetch(searchUrl);
      const searchData: YouTubeAPIResponse = await searchResponse.json();
      
      if (!searchData.items || searchData.items.length === 0) {
        return this.getFallbackVideos().slice(0, maxResults);
      }

      // 2단계: 각 비디오의 상세 정보 가져오기 (조회수, 재생시간 포함)
      const videoIds = searchData.items.map(item => item.id.videoId).join(',');
      const detailsUrl = `${this.baseUrl}/videos?key=${this.apiKey}&id=${videoIds}&part=snippet,statistics,contentDetails`;
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();

      if (!detailsData.items) {
        return this.getFallbackVideos().slice(0, maxResults);
      }

      // 3단계: Shorts 필터링 (60초 이하 제외) 및 조회수 기준 정렬
      const longFormVideos = detailsData.items
        .filter((video: any) => {
          const duration = video.contentDetails?.duration;
          if (!duration) return true; // duration 정보가 없으면 포함
          
          // PT1M = 1분, PT59S = 59초 등의 ISO 8601 duration 파싱
          const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
          if (!match) return true;
          
          const minutes = parseInt(match[1] || '0');
          const seconds = parseInt(match[2] || '0');
          const totalSeconds = minutes * 60 + seconds;
          
          return totalSeconds > 60; // 60초 초과인 것만 포함 (Shorts 제외)
        })
        .map((video: any) => ({
          id: { videoId: video.id },
          snippet: video.snippet,
          viewCount: parseInt(video.statistics?.viewCount || '0')
        }))
        .sort((a: any, b: any) => b.viewCount - a.viewCount) // 조회수 내림차순 정렬
        .slice(0, maxResults)
        .map((video: any) => ({
          id: { videoId: video.id.videoId },
          snippet: video.snippet
        }));

      return longFormVideos.length > 0 ? longFormVideos : this.getFallbackVideos().slice(0, maxResults);
    } catch (error) {
      console.error('YouTube 인기 동영상 가져오기 실패:', error);
      return this.getFallbackVideos().slice(0, maxResults);
    }
  }

  // API 실패 시 대체 데이터
  private getFallbackVideos(): YouTubeVideo[] {
    return [
      {
        id: { videoId: 'aYLEbz7aHgg' },
        snippet: {
          title: '실로스 대표 영상',
          description: '실로스 성형외과 소개 영상',
          thumbnails: {
            medium: { url: `https://img.youtube.com/vi/aYLEbz7aHgg/mqdefault.jpg` },
            default: { url: `https://img.youtube.com/vi/aYLEbz7aHgg/default.jpg` }
          },
          publishedAt: new Date().toISOString(),
          channelTitle: '실로테레비'
        }
      },
      {
        id: { videoId: 'POPULAR_VIDEO_1' },
        snippet: {
          title: '인기 영상 1',
          description: '실로스 인기 시술 안내',
          thumbnails: {
            medium: { url: '/images/youtube-placeholder.jpg' },
            default: { url: '/images/youtube-placeholder.jpg' }
          },
          publishedAt: new Date().toISOString(),
          channelTitle: '실로테레비'
        }
      },
      {
        id: { videoId: 'POPULAR_VIDEO_2' },
        snippet: {
          title: '인기 영상 2',
          description: '실로스 Before & After',
          thumbnails: {
            medium: { url: '/images/youtube-placeholder.jpg' },
            default: { url: '/images/youtube-placeholder.jpg' }
          },
          publishedAt: new Date().toISOString(),
          channelTitle: '실로테레비'
        }
      },
      {
        id: { videoId: 'RECENT_VIDEO_1' },
        snippet: {
          title: '최신 영상 1',
          description: '최근 업로드된 영상',
          thumbnails: {
            medium: { url: '/images/youtube-placeholder.jpg' },
            default: { url: '/images/youtube-placeholder.jpg' }
          },
          publishedAt: new Date().toISOString(),
          channelTitle: '실로테레비'
        }
      }
    ];
  }

  // YouTube 동영상 URL 생성
  getVideoUrl(videoId: string): string {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  // 썸네일 URL 가져오기 (최고 품질)
  getThumbnailUrl(video: YouTubeVideo): string {
    const { thumbnails } = video.snippet;
    return thumbnails.maxres?.url || 
           thumbnails.high?.url || 
           thumbnails.medium.url || 
           thumbnails.default.url;
  }

  // 채널 URL
  getChannelUrl(): string {
    return `https://www.youtube.com/@실로테레비`;
  }
}

export const youtubeService = new YouTubeService();
export type { YouTubeVideo };