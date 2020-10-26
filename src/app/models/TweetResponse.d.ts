import { Status as Tweet } from 'twitter-d';
import {TranslationEntity} from './TranslationResponse';

export interface BatchTweets {
  success: boolean;
  response: TweetResponse[];
}

export interface SingleTweet {
  success: boolean;
  response: TweetResponse;
}

export interface TweetResponse extends Tweet{
  translations: TranslationEntity[];
  extended_tweet: Tweet | null;
  userNickname: UserNickNameEntity | null;
  retweeted_status: TweetResponse;
  text: string;
}

export interface UserNickNameEntity {
  _id: string;
  nickname: string;
}
