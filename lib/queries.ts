import { gql } from "@apollo/client";

export const GET_TEACHER_STATEMENTS = gql`
  query {
  statements {
    nodes {
      title
      teacherFields {
        name
        text
        image {
          node {
            databaseId
          }
        }
      }
    }
  }
}
`;

export const GET_STORIES_TESTIMONIALS = gql`
  query {
    testimonials {
      nodes {
        testimonialfields {
          name
          text
        }
      }
    }
  }
`;

export const GET_RESOURCES = gql`
  query {
  resources {
    nodes {
      title
      uri
      resourcefield {
        description
        category
        link
        image {
          node {
            databaseId
          }
        }
        file {
          node {
            mediaItemUrl
            title
          }
        }
      }
    }
  }
}
`;

export const GET_HOMEPAGE_CAROUSEL_IMAGES = gql`
  query GetHomepageCarouselImages {
  page(id: "home", idType: URI) {
    homepageCarouselImages {
      carouselImage1 {
        node {
            databaseId
          }
      }
      carouselImage2 {
        node {
            databaseId
          }
      }
      carouselImage3 {
        node {
            databaseId
          }
      }
      carouselImage4 {
        node {
            databaseId
          }
      }
      carouselImage5 {
        node {
            databaseId
          }
      }
      carouselImage6 {
        node {
            databaseId
          }
      }
      carouselImage7 {
        node {
            databaseId
          }
      }
      carouselImage8 {
        node {
            databaseId
          }
      }
    }
  }
}
`;

export const GET_TEACHING_ROMA_IMAGES = gql`
  query GetTeachingRomaImages {
    page(id: "teaching-roma", idType: URI) {
      teachingRomaImages {
        imageRow1 {
          node {
            databaseId
          }
        }
        imageRow2 {
          node {
            databaseId
          }
        }
        imageRow3 {
          node {
            databaseId
          }
        }
      }
    }
  }
`;

export const GET_INFOGRAPHICS = gql`
  query GetInfographics {
  infographics {
    nodes {
      id
      title
      infographicsimages {
        infographicImage {
          node {
            databaseId
            sourceUrl
            altText
          }
        }
      }
    }
  }
}
`;

export const GET_MEDIA_ITEMS = gql`
  query GetMediaItems($ids: [ID!]!) {
    mediaItems(where: { in: $ids }) {
      nodes {
        databaseId
        sourceUrl
        altText
      }
    }
  }
`;





