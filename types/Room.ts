import * as Factory from "factory.ts";
import * as faker from 'faker';

export type Room = {
  id: string;
  name: string;
  isLive?: boolean;
  description?: string;
};

export const RoomMockFactory = Factory.Sync.makeFactory<Room>({
  id: Factory.Sync.each(() => faker.random.uuid()),
  name: Factory.Sync.each(() => faker.name.jobTitle()),
  description: Factory.Sync.each(() => faker.lorem.paragraph(5)),
  isLive: Factory.Sync.each(() => faker.random.boolean()),
})
