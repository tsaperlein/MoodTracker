import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

// Colors
import colors from '../../constants/colors';
// Fonts
import fonts from '../../constants/fonts';

// Layout
import ScreenLayout from '../Layout';

// Components
import { Avatar } from 'react-native-elements';
import Button from '../../components/Button';
import LabelInput from '../../components/LabelInput';
import SideButton from '../../components/SideButton';
import MyModal from '../../components/MyModal';
import CircularProgress from 'react-native-circular-progress-indicator';

// Window height
import { HEIGHT } from '../../constants/dimensions';

// Controller
import useProfileController from '../../controllers/profileController';

const strokeColorConfig = [
  { color: colors.red500, value: 20 },
  { color: colors.orange500, value: 40 },
  { color: colors.yellow500, value: 60 },
  { color: colors.green500, value: 80 },
  { color: colors.blue400, value: 100 },
];

export default function Profile() {
  const {
    handleInputChange,
    formState,
    editFinished,
    avatarUri,
    loading,
    uploading,
    handleLogout,
    pickImage,
    handleDeleteImage,
    handleImagePress,
    editButtonAnimation,
    deleteButtonAnimation,
    participation,
  } = useProfileController();

  const avatarSize = HEIGHT < 800 ? 120 : 140;

  // Refs for input fields
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    if (editFinished) {
      // Unfocus all input fields when editing is finished
      if (firstNameRef.current) firstNameRef.current.blur();
      if (lastNameRef.current) lastNameRef.current.blur();
      if (emailRef.current) emailRef.current.blur();
    }
  }, [editFinished]);

  return (
    <ScreenLayout footer={false} backgroundColor={colors.blue900}>
      <View style={styles.container}>
        <MyModal uploading={uploading} />
        <View style={styles.avatarContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.blue400} />
            </View>
          ) : avatarUri ? (
            <>
              <SideButton mode="edit" onPress={pickImage} animationValue={editButtonAnimation} />
              <Avatar
                size={avatarSize}
                rounded
                source={avatarUri ? { uri: avatarUri } : null}
                onPress={handleImagePress}
              />
              <SideButton
                mode="delete"
                onPress={handleDeleteImage}
                animationValue={deleteButtonAnimation}
              />
            </>
          ) : (
            <View style={{ alignSelf: 'center' }}>
              <Avatar
                size={avatarSize}
                rounded
                icon={{ name: 'camera', type: 'font-awesome', size: 50, color: colors.blue900 }}
                onPress={pickImage}
                containerStyle={{ backgroundColor: colors.blue700 }}
              />
            </View>
          )}
        </View>
        <View style={styles.userInfoContainer}>
          <LabelInput
            label="First Name"
            value={formState.first_name}
            onChangeText={(value) => handleInputChange('first_name', value)}
            keyboardType="default"
            inputRef={firstNameRef}
          />
          <LabelInput
            label="Last Name"
            value={formState.last_name}
            onChangeText={(value) => handleInputChange('last_name', value)}
            keyboardType="default"
            inputRef={lastNameRef}
          />
          <LabelInput
            label="Email"
            value={formState.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            inputRef={emailRef}
          />
        </View>
        <View style={styles.participationContainer}>
          <View style={styles.participation}>
            <Text style={styles.participationText}>Survey {'\n'} Participation</Text>
          </View>
          <View style={styles.participation}>
            <CircularProgress
              value={participation}
              radius={avatarSize / 2}
              progressValueColor={colors.blue400}
              progressValueStyle={{ fontFamily: fonts.medium }}
              progressValueFontSize={HEIGHT / 24}
              inActiveStrokeColor={colors.blue700a70}
              inActiveStrokeWidth={35}
              activeStrokeWidth={20}
              valueSuffix={'%'}
              duration={1500}
              strokeLinecap="butt"
              strokeColorConfig={strokeColorConfig}
              allowFontScaling={true}
            />
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <Button
            text="Log Out"
            buttonColor={colors.red600}
            color={colors.red100}
            padding={'3%'}
            margin={'3%'}
            fontSize={18}
            fontFamily={fonts.medium}
            action={handleLogout}
          />
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue900,
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoContainer: {
    flex: 2,
    width: '100%',
    paddingHorizontal: '5%',
    borderRadius: 10,
    justifyContent: 'center',
  },
  participationContainer: {
    flex: 1,
    margin: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue800a50,
    borderRadius: 20,
  },
  participation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  participationText: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.blue400,
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
