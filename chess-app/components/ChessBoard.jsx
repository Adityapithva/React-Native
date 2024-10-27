import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Helper function to determine if a tile is light or dark
const isLightTile = (row, col) => (row + col) % 2 === 0;

const initialBoard = [
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
];

// Map each piece to a Unicode character for display
const pieceSymbols = {
    'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙',
    'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟'
};

const ChessBoard = () => {
    return (
        <View style={tw`flex flex-wrap flex-row w-80 h-80`}>
            {initialBoard.map((row, rowIndex) =>
                row.map((piece, colIndex) => (
                    <View
                        key={`${rowIndex}-${colIndex}`}
                        style={[
                            tw`w-10 h-10 items-center justify-center`,
                            isLightTile(rowIndex, colIndex) ? tw`bg-gray-200` : tw`bg-gray-600`
                        ]}
                    >
                        <Text style={tw`text-2xl ${piece === piece.toUpperCase() ? 'text-black' : 'text-white'}`}>
                            {pieceSymbols[piece] || ''}
                        </Text>
                    </View>
                ))
            )}
        </View>
    );
};

export default ChessBoard;
