import { View, Text } from "react-native"
import { Colors } from './../../constants/Colors';
export default function OptionCard({ option, selectedOption }) {
    const isSelected = selectedOption?.id === option?.id;

    return (
        <View
            style={[
                {
                    padding: 25,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: Colors.light_gray,
                    borderRadius: 15,
                },
                isSelected
                    ? { borderWidth: 3, borderColor: Colors.primary }
                    : {}
            ]}
        >
            <View>
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: 'outfit-bold',
                    }}
                >
                    {option.title}
                </Text>
                <Text
                    style={{
                        fontSize: 17,
                        fontFamily: 'outfit-bold',
                        color: Colors.gray,
                    }}
                >
                    {option.desc}
                </Text>
            </View>
            <Text
                style={{
                    fontSize: 40,
                }}
            >
                {option.icon}
            </Text>
        </View>
    );
}
