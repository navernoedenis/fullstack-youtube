import styled from "@emotion/styled";
import MuiBox from "@mui/material/Box";

export const UserVideosContainer = styled(MuiBox)`
  .video-grid {
    grid-template-columns: repeat(5, 1fr);
  }

  .video-grid .video-link-thumbnail {
    height: 156px;
  }

  @media screen and (max-width: 1200px) {
    .video-grid {
      grid-template-columns: repeat(4, 1fr);

      .video-link-thumbnail {
        height: 14vw;
      }

      .video-link-avatar {
        display: none;
      }
    }
  }

  @media screen and (max-width: 873px) {
    .video-grid {
      grid-template-columns: repeat(2, 1fr);

      .video-link-thumbnail {
        height: 24vw;
      }
    }
  }

  @media screen and (max-width: 587px) {
    .video-grid {
      grid-template-columns: 1fr;

      .video-link {
        display: flex;
        flex-direction: row;
      }

      .video-link-information {
        margin-top: 0;
        margin-left: 10px;
      }

      .video-link-thumbnail {
        height: 24vw;
        width: 40vw;
      }

      .video-link-avatar {
        display: none;
      }
    }
  }
`;
