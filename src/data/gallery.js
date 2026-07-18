
const px = (id, ext = "jpeg") =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&w=700&h=900&fit=crop`;

export const GALLERY = [
  { src: px(31629944), alt: "Couple de mariés au coucher du soleil, cérémonie en plein air" },
  { src: px(6291011),  alt: "Mariés main dans la main au milieu du décor floral" },
  { src: px(35349365, "png"), alt: "Cérémonie sous une arche fleurie en extérieur" },
  { src: px(13617315), alt: "Jeunes mariés rayonnants pendant la célébration" },
  { src: px(14474291), alt: "Mariés main dans la main, photographie noir et blanc" },
  { src: px(9517406),  alt: "Couple enlacé face à face en plein air" },
  { src: px(18004224), alt: "Étreinte tendre des mariés en extérieur" },
  { src: px(27060159), alt: "Portrait des mariés en noir et blanc" },
  { src: px(30740015), alt: "Moment d'émotion pendant la cérémonie" },
];