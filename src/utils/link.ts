export const validate = (link: string) => {
  if (!link) return 'Champ requis';
  if (link.startsWith('https://vimeo.com') || link.startsWith('https://www.flickr.com')) {
    return '';
  }
  return 'Lien non valide ou non pris en charge';
};

export const getLinkDetails = async (link: string) => {
  if (validate(link)) return null;
  let url = link.startsWith('https://vimeo.com')
    ? `https://vimeo.com/api/oembed.json?url=${link}`
    : `https://www.flickr.com/services/oembed/?format=json&url=${link}`;
  const response = await fetch(url);
  const data = await response.json();

  return { ...data, type: link.startsWith('https://vimeo.com') ? 'video' : 'photo' };
};
