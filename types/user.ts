/** Minimal projection of Random User API result we care about. */
export type RandomUser = {
  name: { title: string; first: string; last: string };
  email: string;
  phone: string;
  picture: { large: string; medium: string; thumbnail: string };
};

export type RandomUserResponse = {
  results: RandomUser[];
};
