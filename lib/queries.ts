import { gql } from "@apollo/client";

export const GET_TEACHER_STATEMENTS = gql`
  query GetTeacherStatements($language: LanguageCodeFilterEnum!) {
    statements(first: 1000, where: { language: $language }) {
      nodes {
        title
        teacherFields {
          name
          text
          image {
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

export const GET_STORIES_TESTIMONIALS = gql`
  query GetTestimonials($language: LanguageCodeFilterEnum!) {
  testimonials(first: 2000, where: { language: $language }) {
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
  query GetResources($language: LanguageCodeFilterEnum!) {
    resources(first: 2000, where: { language: $language }) {
      nodes {
        title
        uri
        resourcefield {
          text
          description
          category
          link
          image {
            node {
              databaseId
              sourceUrl
              altText
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
  query GetInfographics($language: LanguageCodeFilterEnum!) {
    infographics(first: 100, where: { language: $language }) {
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





