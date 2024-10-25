import { Text, View } from "react-native";
import ChessBoard from "../components/ChessBoard";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ChessBoard/>
    </View>
  );
}
