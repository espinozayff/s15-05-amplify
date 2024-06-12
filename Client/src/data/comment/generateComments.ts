import { Comment } from "./comment.types";

const maleNames = [
  "Santiago García",
  "Andrés Pérez",
  "Javier Rodríguez",
  "Mateo Fernández",
  "Diego López",
  "Carlos Martínez",
  "Gabriel Ramírez",
  "Juan Castillo",
  "Pablo Ruiz",
  "Fernando Soto",
];

const femaleNames = [
  "Luisa Martínez",
  "María José Gutiérrez",
  "Valentina Díaz",
  "Isabella Sánchez",
  "Camila González",
  "Ana Rodríguez",
  "Laura Pérez",
  "Sofía Vargas",
  "Valeria Torres",
  "Lucía Flores",
];

const commentsArray = [
  "¡Este álbum es increíble!",
  "Me encantan las canciones, muy pegadizas.",
  "Gran calidad de producción.",
  "Esta pista es mi favorita.",
  "Fantástico trabajo del artista.",
  "¡Este álbum es una joya!",
  "Me fascinan estas canciones, ¡no puedo dejar de escucharlas!",
  "La producción de este disco es impresionante.",
  "No puedo decidir cuál es mi pista favorita, todas son geniales.",
  "Qué talento tiene este artista, cada canción es única.",
  "¡Qué energía tiene esta música!",
  "Los arreglos son simplemente asombrosos.",
  "Una experiencia auditiva inolvidable.",
  "Estas canciones me hacen sentir vivo.",
  "Increíble trabajo, ¡espero más música de este artista pronto!",
];

const imageUrls = (gender: "men" | "women", index: number) =>
  `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;

const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const generateRandomComments = (count: number): Comment[] => {
  const comments: Comment[] = [];
  const usedComments: string[] = [];
  const usedUserNames: string[] = [];

  for (let i = 0; i < count; i++) {
    const isMale = Math.random() > 0.5;
    const gender = isMale ? "men" : "women";
    const index = Math.floor(Math.random() * 10);

    // Obtener un nombre de usuario aleatorio que aún no ha sido utilizado
    let randomName = getRandomElement(isMale ? maleNames : femaleNames);
    while (usedUserNames.includes(randomName)) {
      randomName = getRandomElement(isMale ? maleNames : femaleNames);
    }
    usedUserNames.push(randomName); // Agregar el nombre de usuario utilizado al array de nombres de usuario utilizados

    // Obtener un comentario aleatorio que aún no ha sido utilizado
    let randomComment = getRandomElement(commentsArray);
    while (usedComments.includes(randomComment)) {
      randomComment = getRandomElement(commentsArray);
    }
    usedComments.push(randomComment); // Agregar el comentario utilizado al array de comentarios utilizados

    comments.push({
      id: i + 1,
      userName: randomName,
      userImage: imageUrls(gender, index),
      date: `${Math.floor(Math.random() * 10) + 1}`,
      content: randomComment,
    });
  }

  return comments;
};

export default generateRandomComments;
