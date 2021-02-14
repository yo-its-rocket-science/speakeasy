import * as Factory from "factory.ts";
import * as faker from 'faker';


export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  picture?: string; // url to pic?
  bio?: string;
};

export const UserMockFactory = Factory.Sync.makeFactory<User>({
  id: Factory.Sync.each(() => faker.random.uuid()),
  name: Factory.Sync.each(() => faker.name.findName()),
  username: Factory.Sync.each(() => `@${faker.random.word()}`),
  password: Factory.Sync.each(() => faker.random.uuid()),
  email: Factory.Sync.each(() => faker.internet.email()),
  bio: Factory.Sync.each(() => faker.lorem.paragraph(5)),
  picture: `https://source.unsplash.com/random/85x85`,
})
