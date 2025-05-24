export interface Course {
  id: string
  title: string
  description: string
  fullDescription: string
  image: string
  galleryImages: string[]
  price: number
  location: string
  duration: string
  level: string
  rating: number
  reviewCount: number
  isPopular: boolean
  includes: string[]
  certification: string
  schedule: {
    day: string
    activities: string
  }[]
  instructor: {
    name: string
    title: string
    bio: string
    image: string
  }
  reviews: {
    userName: string
    userImage: string
    rating: number
    date: string
    comment: string
  }[]
}
