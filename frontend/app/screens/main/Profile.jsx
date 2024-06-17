import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

// Layout
import ScreenLayout from '../Layout';

// Colors
import colors from '../../config/colors';
// Icons
import { FontAwesome6 } from '@expo/vector-icons';

// Components
import Button from '../../components/Button';
import ScoreIndicator from '../../components/ScoreIndicator';
import { Avatar } from 'react-native-elements';

// Avatar Dimension
const width = Dimensions.get('window').width;
const avatarDim = width / 3;

export default function Profile({ navigation }) {
  const [EditMode, setEditMode] = useState(false);

  const LabelContainer = ({ text, keyboardType = 'default' }) => {
    return (
      <View style={styles.labelContainerStyle}>
        {EditMode ? (
          <TextInput
            style={styles.labelStyle}
            placeholder={text}
            placeholderTextColor={colors.blue800a70}
            keyboardType={keyboardType}
            autoCapitalize="none"
          />
        ) : (
          <Text style={styles.labelStyle}>{text}</Text>
        )}
      </View>
    );
  };

  return (
    <ScreenLayout footer={false} backgroundColor={colors.blue900}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ width: '100%', height: '100%' }}>
          <View
            style={{
              flex: 2 / 5,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <View style={{ flex: 1 / 2, alignItems: 'center', justifyContent: 'center' }}>
              <Avatar
                rounded
                source={require('../../assets/images/tsaperlein.png')}
                containerStyle={styles.avatarStyle}
              />
              {EditMode && (
                <TouchableOpacity
                  style={[
                    styles.avatarStyle,
                    {
                      position: 'absolute',
                      backgroundColor: 'rgba(0,0,0,0.3)',
                    },
                  ]}
                  onPress={() => console.log('Image Change!')}
                >
                  <FontAwesome6 name="edit" size={40} color={colors.blue200} />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.userInfoContainer}>
              <LabelContainer text={'Alexandros Tsaparas'} keyboardType="default" />
              <LabelContainer text={'+306948753087'} keyboardType="phone-pad" />
              <LabelContainer text={'alextsaparas@icloud.com'} keyboardType="email-address" />
            </View>
          </View>
          <View
            style={{
              flex: 2 / 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ScoreIndicator />
          </View>
          <View
            style={{
              flex: 1 / 5,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              {EditMode ? (
                <Button
                  text="Save Changes"
                  buttonColor={colors.blue400a70}
                  color={colors.blue100}
                  padding={'3%'}
                  margin={'3%'}
                  fontSize={18}
                  fontFamily={Platform.OS === 'ios' ? 'outfitMedium' : 'robotoBold'}
                  action={() => setEditMode(false)}
                />
              ) : (
                <Button
                  text="Edit Profile"
                  buttonColor={colors.green400a70}
                  color={colors.green100}
                  padding={'3%'}
                  margin={'3%'}
                  fontSize={18}
                  fontFamily={Platform.OS === 'ios' ? 'outfitMedium' : 'robotoBold'}
                  action={() => setEditMode(true)}
                />
              )}
              <Button
                text="Log Out"
                buttonColor={colors.red400a70}
                color={colors.red100}
                padding={'3%'}
                margin={'3%'}
                fontSize={18}
                fontFamily={Platform.OS === 'ios' ? 'outfitMedium' : 'robotoBold'}
                action={() => navigation.replace('SignIn')}
              />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '4%' }}>
              <Text style={{ color: colors.blue100, marginBottom: '0.5%' }}>
                Forgot your password?
              </Text>
              <TouchableOpacity>
                <Text style={{ color: colors.blue400, fontWeight: '600' }}>Reset Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  avatarStyle: {
    width: avatarDim,
    height: avatarDim,
    borderRadius: avatarDim / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoContainer: {
    flex: 1 / 2,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue500,
    borderRadius: 20,
    borderWidth: '1%',
    borderBottomWidth: 0,
    borderColor: colors.blue400,
    overflow: 'hidden',
  },
  labelContainerStyle: {
    flex: 1 / 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: '1%',
    borderColor: colors.blue400,
  },
  labelStyle: {
    width: '100%',
    textAlign: 'center',
    color: colors.blue900,
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'outfitMedium' : 'robotoBold',
  },
});
