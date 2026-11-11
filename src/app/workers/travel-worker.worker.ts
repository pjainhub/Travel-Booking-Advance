self.onmessage = ({ data }) => {
  const { rooms, keyword } = data as { rooms: Array<{ roomType: string; description: string; amenities: string[] }>; keyword: string };

  const safeKeyword = (keyword ?? '').trim().toLowerCase();
  const filtered = rooms.filter((room) => {
    const searchableText = [room.roomType, room.description, ...(room.amenities ?? [])].join(' ').toLowerCase();
    return !safeKeyword || searchableText.includes(safeKeyword);
  });

  self.postMessage({ filtered });
};
