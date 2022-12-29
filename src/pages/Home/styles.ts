import { FlatList } from "react-native";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  background-color: #141a29;
  flex: 1;
  padding: 4px 0;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 14px;
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.4);
  color: #ffffff;
  width: 85%;
  height: 50px;
  border-radius: 50px;
  padding: 8px 15px;
  font-size: 18px;
`;

export const SearchButton = styled.TouchableOpacity`
  width: 15%;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  padding-top: 20px;
  padding-bottom: 8px;
  padding-left: 14px;
  padding-top: 14px;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
`;

export const BannerButton = styled.TouchableOpacity``;

export const Banner = styled.Image`
  height: 150px;
  border-radius: 15px;
  margin: 0 15px;
`;

export const SliderMovie = styled.FlatList`
  height: 250px;
  padding: 0 14px;
`;

export const Loading = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
