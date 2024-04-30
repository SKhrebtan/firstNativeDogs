import { View, Text } from 'react-native';

export default function CustomHeader({ title }) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff' }}>
        {title}
      </Text>
    </View>
  );
}
