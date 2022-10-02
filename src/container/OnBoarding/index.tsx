import React, { memo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Theme from "style/Theme";
import LinearColors from "elements/LinearColors";
import { Colors, Constants, Routes } from "configs";
import OnboardingPage from "components/OnBoarding/OnBoardingPage";
import Animated from "react-native-reanimated";
import DotProgress from "components/OnBoarding/DotProgress";
import ButtonText from "elements/Buttons/ButtonText";
import Text from "elements/Text";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useNavigation } from "@react-navigation/native";
import { ONBOARDING } from "configs/Data";
import Container from "elements/Layout/Container";
import { useTheme } from "configs/Theme";

interface OnBoardingProps {}

const { Value, event, set } = Animated;

const OnBoarding = memo((props: OnBoardingProps) => {
  const scrollX = new Value(0);
  const { navigate } = useNavigation();
  const onLogin = useCallback(() => {
    navigate(Routes.Login);
  }, [navigate]);
  const onSignUp = useCallback(() => {
    console.log('xxx',scrollX)
    navigate(Routes.SignUp);
  }, [navigate]);
  const onGetHere = useCallback(() => {}, []);
  const { theme } = useTheme();
  return (
    <Container style={styles.container}>
      <LinearColors
        style={StyleSheet.absoluteFillObject}
        colors={[Colors.TealBlue, Colors.TurquoiseBlue]}
      >
        <Animated.ScrollView
        
          horizontal
          snapToInterval={Constants.width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={event([
            {
              nativeEvent: {
                contentOffset: {
                  x: (x: number) => set(scrollX, x),
                },
              },
            },
          ])}
        >
          {ONBOARDING.map((i, index) => (
            <OnboardingPage
              {...i}
              key={i.id.toString()}
              isFirstItem={index === 0}
              isLastItem={index === ONBOARDING.length - 1}
            />
          ))}
        </Animated.ScrollView>
        <DotProgress numberOfDots={ONBOARDING.length} scrollX={scrollX} />
        <ButtonText
          title={"Log in"}
          style={styles.loginButton}
          textProps={{ bold: true }}
          onPress={onLogin}
          backgroundColor={Colors.TealBlue}
          white
        />
        <ButtonText
          title={"Sign Up"}
          style={styles.signUpButton}
          textProps={{ bold: true }}
          onPress={onSignUp}
          backgroundColor={Colors.White}
          highlight
        />
        <View style={styles.changeApp}>
          <Text type="H6" color={Colors.White} white>
            Are you a doctor?{" "}
            <Text
              type="H6"
              white
              style={{ textDecorationLine: "underline" }}
              onPress={onGetHere}
            >
              Get here!
            </Text>
          </Text>
        </View>
      </LinearColors>
    </Container>
  );
});

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
  },
  loginButton: {
    width: (Constants.width - 88) / 2,
    height: 50,
    position: "absolute",
    bottom: (Constants.height / 812) * 77 + getBottomSpace(),
    left: 32,
  },
  signUpButton: {
    width: (Constants.width - 88) / 2,
    height: 50,
    position: "absolute",
    bottom: (Constants.height / 812) * 77 + getBottomSpace(),
    right: 32,
  },
  changeApp: {
    position: "absolute",
    bottom: 16 + getBottomSpace(),
    alignSelf: "center",
  },
});
