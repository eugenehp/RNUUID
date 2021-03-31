import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import styled from '@emotion/native';
import * as uuid from 'react-native-uuid';
import type {GenerateUUID} from 'react-native-uuid';

const MARGIN = '50px';

const Spacer = styled.View`
  height: ${MARGIN};
  width: 100%;
`;

const ButtonContainer = styled.TouchableOpacity`
  flex: 1;
  background-color: black;
  height: ${MARGIN};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border: 1px solid gray;
`;

const ButtonText = styled.Text`
  color: white;
`;

type ButtonProps = {
  title: string;
  onPress?: () => void;
};

const Button: React.FC<ButtonProps> = props => (
  <ButtonContainer onPress={props.onPress}>
    <ButtonText>{props.title}</ButtonText>
  </ButtonContainer>
);

const Hero = styled.Text`
  font-size: ${MARGIN};
  width: 100%;
  text-align: center;

  margin-bottom: ${MARGIN};
`;

const H1 = styled.Text`
  font-size: 25px;
  width: 100%;
  text-align: center;
`;

const TextUUID = styled.Text`
  font-size: 18px;
  width: 100%;
  text-align: center;
`;

const Input = styled.TextInput`
  flex: 1;
  height: ${MARGIN};

  border: 1px solid black;
  padding-left: 10px;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  display: flex;
  flex-direction: column;
`;

type V3Props = {
  title: string;
  generateUUID: GenerateUUID;
};

const V3: React.FC<V3Props> = props => {
  const [name, setName] = useState('');
  const [namespace, setNamespace] = useState('');
  const [v3, setV3] = useState('-');

  const onPress = () => {
    setV3(props.generateUUID(name, namespace) as string);
  };

  return (
    <Container>
      <H1>{props.title}</H1>
      <TextUUID>{v3}</TextUUID>

      <Input value={name} onChangeText={setName} placeholder="name" />
      <Input
        value={namespace}
        onChangeText={setNamespace}
        placeholder="namespace"
      />
      <Row>
        <Button onPress={() => setNamespace(uuid.URL)} title="URL" />
        <Button onPress={() => setNamespace(uuid.DNS)} title="DNS" />
        <Button onPress={() => setNamespace(uuid.OID)} title="OID" />
        <Button onPress={() => setNamespace(uuid.X500)} title="X.500" />
      </Row>

      <Button onPress={onPress} title="Generate" />
      <Spacer />
    </Container>
  );
};

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? '#222222' : '#FFFFFF';
  const backgroundStyle = {backgroundColor};

  const [v1, setV1] = useState('');
  const [v4, setV4] = useState('');

  useEffect(() => {
    setV1(uuid.v1() as string);
    setV4(uuid.v4() as string);
  }, []);

  const onPressV1 = () => {
    setV1(uuid.v1() as string);
  };

  const onPressV4 = () => {
    setV4(uuid.v4() as string);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={{backgroundColor}}>
          <Hero>RNUUID Example</Hero>

          <TextUUID>{v1}</TextUUID>
          <Button onPress={onPressV1} title="UUID.v1" />
          <Spacer />

          <V3 title="UUID.v3" generateUUID={uuid.v3} />

          <TextUUID>{v4}</TextUUID>
          <Button onPress={onPressV4} title="UUID.v4" />
          <Spacer />

          <V3 title="UUID.v5" generateUUID={uuid.v5} />

          <TextUUID>{uuid.NIL}</TextUUID>
          <Button title="UUID.NIL" />
          <Spacer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
