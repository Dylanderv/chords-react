enum Visibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE"
}

export default interface Partition {
  id: string;
  name: string;
  creationDate: string;
  updatedAt: string;
  visibility: Visibility,
  owner: {
    id: string;
    username: string;
  };
  chords: {
    key: string;
    suffix: string;
    position: string;
    instrument: {
      name: string;
    }
  }
}
