import tw from "twrnc";
import { Text,View } from "react-native";
const isTileWhite = (row,col) => (row + col) % 2 === 0;
const ChessBoard = () => {
    return <>
        <View style={tw`flex flex-wrap flex-row w-80 h-80`}>
            {[...Array(8)].map((_,row) => (
                [...Array(8)].map((_,col) => (
                    <View
                    key={`${row}-${col}`}
                    style={[tw`w-10 h-10`,isTileWhite(row,col) ? tw`bg-gray-200` : tw`bg-gray-600`]}
                    >
                        <Text style={tw`text-center text-xs text-white`}>
                            {`${row},${col}`}
                        </Text>
                    </View>
                ))
            ))}
        </View>
    </>
}
export default ChessBoard;