import type { Photo } from '../../components/Gallery/types';

const shootingPhotos: Photo[] = [
  {
    src: '/photos/roope_ampuu_pistooli_1.jpg',
    width: 1600,
    height: 2000,
    alt: 'Shooter performing a one-handed pistol reload at a snowy range',
    category: 'pistol',
  },
  {
    src: '/photos/roope_ampuu_kivaari_1.jpg',
    width: 2000,
    height: 1333,
    alt: 'Shooter firing a rifle at an outdoor winter range, spent casing ejecting mid-air',
    category: 'rifle',
  },
  {
    src: '/photos/roope_ampuu_pistooli_pov_2.jpg',
    width: 1975,
    height: 1317,
    alt: 'First-person view aiming a pistol with both hands at forest targets in bright sunlight',
    category: 'pov',
  },
  {
    src: '/photos/roope_ampuu_kivaari_pov_1.jpg',
    width: 2000,
    height: 1333,
    alt: 'First-person view down a rifle red dot sight toward targets on a summer range',
    category: 'pov',
  },
  {
    src: '/photos/roope_ampuu_pistooli_pov_1.jpg',
    width: 2000,
    height: 1333,
    alt: 'First-person view aiming a pistol with both hands at a numbered practical shooting bay',
    category: 'pov',
  },
  {
    src: '/photos/roope_ampuu_kivaari_pov_2.jpg',
    width: 2000,
    height: 1333,
    alt: 'First-person view aiming a rifle from a vehicle doorway toward a target stand',
    category: 'pov',
  },
];

export default shootingPhotos;
