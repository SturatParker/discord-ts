import {
  ChannelModel,
  IChannel,
  IChannelDocument,
} from '../database/collections/channel';
export function dummyChannelData(): Promise<IChannelDocument[]> {
  const channels: IChannel[] = [
    {
      adminChannelId: '1',
      publicChannelId: '1',
      isTracked: true,
      maxVotes: 5,
      maxOwnVotes: 2,
      submissions: [],
    },
    {
      adminChannelId: '2',
      publicChannelId: '2',
      isTracked: true,
      maxVotes: 10,
      maxOwnVotes: 4,
      submissions: [],
    },
    {
      adminChannelId: '3',
      publicChannelId: '3',
      isTracked: false,
      maxVotes: 15,
      maxOwnVotes: 6,
      submissions: [],
    },
    {
      adminChannelId: '4',
      publicChannelId: '4',
      isTracked: false,
      maxVotes: 20,
      maxOwnVotes: 8,
      submissions: [],
    },
  ];
  return Promise.all(
    channels.map((channel: IChannel) => {
      console.log(`Creating channel ${channel.publicChannelId}`);
      return ChannelModel.create(channel);
    })
  );
}
