export interface Villa {
  id: number;
  name: string;
  slug: string;
  description: string;
  bgImage: string;
  cardImage: string;
  link: string;
}

export const villas: Villa[] = [
  {
    id: 1,
    name: 'Hibiscus',
    slug: 'garden-villa',
    description: 'Sleeps 2 adults',
    bgImage: '/media/home/villas/hibiscus.jpg',
    cardImage:
      '/media/home/villas/garden-villa/dfd5bc50bf-1703335696/gardenbedspreadedit-540x720-crop-q72.jpg',
    link: '/stay/garden-villa',
  },
  {
    id: 2,
    name: 'Oleander',
    slug: 'pool-studio',
    description: 'Sleeps 2 adults — with a pool and outside shower',
    bgImage:
      '/media/home/villas/pool-studio/dae3363e63-1703335742/walls-1920x1440-crop-q72.jpg',
    cardImage:
      '/media/home/villas/pool-studio/61e7693f5c-1703335737/poolstudiopool-540x720-crop-q72.jpg',
    link: '/stay/pool-studio',
  },
  {
    id: 3,
    name: 'Bougainvillea',
    slug: 'pool-villa',
    description:
      'Sleeps 2 adults — Includes a pool, a large veranda and inside and outside bathrooms',
    bgImage:
      '/media/home/villas/pool-villa/caec2df234-1703335746/poollookout2swallows-1920x1440-crop-q72.jpg',
    cardImage:
      '/media/home/villas/pool-villa/ab334eadb6-1703335743/header-pool-villa-540x720-crop-q72.jpg',
    link: '/stay/pool-villa',
  },
  {
    id: 4,
    name: 'Frangipani',
    slug: 'master-pool-villa',
    description: 'Sleeps 4 adults — with 2 pools, 2 bedrooms and 2 bathrooms',
    bgImage:
      '/media/home/villas/master-pool-villa/14f6648d4f-1703335769/masterpoolvillabalex-1920x1440-crop-q72.jpg',
    cardImage:
      '/media/home/villas/master-pool-villa/173bf665f1-1703335764/leavesonwhite-540x720-crop-q72.jpg',
    link: '/stay/master-pool-villa',
  },
  {
    id: 5,
    name: 'Allamanda House',
    slug: 'pool-villa',
    description:
      'Sleeps 2 adults — Includes a pool, a large veranda and inside and outside bathrooms',
    bgImage:
      '/media/home/villas/pool-villa/caec2df234-1703335746/poollookout2swallows-1920x1440-crop-q72.jpg',
    cardImage:
      '/media/home/villas/pool-villa/ab334eadb6-1703335743/header-pool-villa-540x720-crop-q72.jpg',
    link: '/stay/pool-villa',
  },
  {
    id: 6,
    name: 'Beach House',
    slug: 'master-pool-villa',
    description: 'Sleeps 4 adults — with 2 pools, 2 bedrooms and 2 bathrooms',
    bgImage:
      '/media/home/villas/master-pool-villa/14f6648d4f-1703335769/masterpoolvillabalex-1920x1440-crop-q72.jpg',
    cardImage:
      '/media/home/villas/master-pool-villa/173bf665f1-1703335764/leavesonwhite-540x720-crop-q72.jpg',
    link: '/stay/master-pool-villa',
  },
];
