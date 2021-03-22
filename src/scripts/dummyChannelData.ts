import { ChannelModel, IChannel, IChannelDocument } from '../database/channel';
export function dummyChannelData(): Promise<IChannelDocument[]> {
  const channels: IChannel[] = [
    {
      channelId: '1',
      isTracked: true,
      maxVotes: 5,
      maxOwnVotes: 2,
    },
    {
      channelId: '2',
      isTracked: true,
      maxVotes: 10,
      maxOwnVotes: 4,
    },
    {
      channelId: '3',
      isTracked: false,
      maxVotes: 15,
      maxOwnVotes: 6,
    },
    {
      channelId: '4',
      isTracked: false,
      maxVotes: 20,
      maxOwnVotes: 8,
    },
  ];
  return Promise.all(
    channels.map((channel: IChannel) => {
      console.log(`Creating channel ${channel.channelId}`);
      return ChannelModel.create(channel);
    })
  );
}
