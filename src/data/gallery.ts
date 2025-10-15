export type GalleryItem = {
  id: string;
  title?: string;
  caption?: string;
  img: string;
};

export const employees: GalleryItem[] = [
  { id: 'emp1', title: 'Andi - Barista', caption: 'Head Barista', img: '/gallery/employees/andi.jpg' },
  { id: 'emp2', title: 'Siti - Kasir', caption: 'Customer Service', img: '/gallery/employees/siti.jpg' },
  { id: 'emp3', title: 'Budi - Cook', caption: 'Chef', img: '/gallery/employees/budi.jpg' },
  // Add more employees as needed
];

export const areaPhotos: GalleryItem[] = [
  { id: 'area1', caption: 'Interior Rivea - Seating', img: '/gallery/area/interior1.jpg' },
  { id: 'area2', caption: 'Outdoor by the river', img: '/gallery/area/outdoor1.jpg' },
  { id: 'area3', caption: 'Corner lounge', img: '/gallery/area/lounge1.jpg' },
  // Add more area photos
];

export default { employees, areaPhotos };
