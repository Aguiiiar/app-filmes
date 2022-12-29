import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background: #191a30;
`;

export const Header = styled.View`
  z-index: 99;
  position: absolute;
  top: 35px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 14px;
`;
export const HeaderButton = styled.TouchableOpacity`
  width: 46px;
  height: 46px;
  background-color: rgba(25, 26, 48, 0.8);
  border-radius: 26px;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 350px;
  border-bottom-left-radius: 70px;
  border-bottom-right-radius: 70px;
`;

export const BannerLink = styled.TouchableOpacity`
  background-color: #e72f49;
  width: 63px;
  height: 63px;
  border-radius: 35px;
  position: absolute;
  top: 310px;
  right: 15px;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const Title = styled.Text`
  color: #ffffff;
  font-size: 22px;
  font-weight: bold;
  padding: 8px 14px;
  margin-top: 8px;
`;

export const ContentArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
`;

export const Rate = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;

export const ListGenres = styled.FlatList`
  padding-left: 14px;
  margin: 8px 0;
  max-height: 35px;
`;

export const Description = styled.Text`
  padding-left: 14px;
  padding-right: 14px;
  padding-bottom: 30px;
  color: #ffffff;
  line-height: 20px;
`;
