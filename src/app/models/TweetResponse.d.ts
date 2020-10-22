import { Status as Tweet } from 'twitter-d';

export interface BatchTweets {
  success: boolean;
  response: TweetResponse[];
}

export interface SingleTweet {
  success: boolean;
  response: TweetResponse;
}

export interface TweetResponse extends Tweet{
  translations: Translation;
  userNickname: UserNickNameEntity | null;
  text: string;
}

export interface UserNickNameEntity {
  _id: string;
  nickname: string;
}
