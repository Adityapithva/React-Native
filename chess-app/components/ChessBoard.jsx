import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// Helper function to determine tile color
const isLightTile = (row, col) => (row + col) % 2 === 0;

// Initial chessboard layout
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

// Unicode symbols for chess pieces
const pieceSymbols = {
  R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', P: '♙',
  r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', p: '♟'
};

const ChessBoard = () => {
  return (
    <View style={[{ width: 320, height: 320 }, tw`flex flex-wrap flex-row`]}>
      {initialBoard.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <View
            key={`${rowIndex}-${colIndex}`}
            style={[
              { width: 40, height: 40 }, // Explicit width and height
              tw`items-center justify-center`,
              isLightTile(rowIndex, colIndex) ? tw`bg-gray-200` : tw`bg-gray-600`
            ]}
          >
            <Text
              style={tw.style(
                'text-2xl',
                piece === piece.toUpperCase() ? 'text-black' : 'text-white'
              )}
            >
              {pieceSymbols[piece] || null}
            </Text>
          </View>
        ))
      )}
    </View>
  );
};

export default ChessBoard;
