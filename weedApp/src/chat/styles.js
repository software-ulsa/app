import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

export const Fonts = {
  whiteColor18Light: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Mulish_400Regular",
  },

  whiteColor12Regular: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
  },

  whiteColor14Regular: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
  },

  whiteColor16Regular: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
  },

  whiteColor17Medium: {
    color: "#ffffff",
    fontSize: 17,
    fontFamily: "Mulish_600SemiBold",
  },

  whiteColor19Medium: {
    color: "#ffffff",
    fontSize: 19,
    fontFamily: "Mulish_600SemiBold",
  },

  whiteColor22Medium: {
    color: "#ffffff",
    fontSize: 22,
    fontFamily: "Mulish_600SemiBold",
  },

  blackColor13Regular: {
    color: "#000000",
    fontSize: 13,
    fontFamily: "Mulish_400Regular",
  },

  blackColor15Regular: {
    color: "#000000",
    fontSize: 15,
    fontFamily: "Mulish_400Regular",
  },

  blackColor16Regular: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
  },

  blackColor17Regular: {
    color: "#000000",
    fontSize: 17,
    fontFamily: "Mulish_400Regular",
  },

  blackColor16Medium: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "Mulish_600SemiBold",
  },

  blackColor17Medium: {
    color: "#000000",
    fontSize: 17,
    fontFamily: "Mulish_600SemiBold",
  },

  blackColor18Bold: {
    color: "#000000",
    fontSize: 18,
    fontFamily: "Mulish_400Regular",
    fontWeight: "bold",
  },

  primaryColor12Regular: {
    color: "#B34D4D",
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
  },

  primaryColor15Regular: {
    color: "#B34D4D",
    fontSize: 15,
    fontFamily: "Mulish_400Regular",
  },

  primaryColor16Regular: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
  },

  primaryColor26Regular: {
    color: "#B34D4D",
    fontSize: 26,
    fontFamily: "Mulish_400Regular",
  },

  primaryColor17Medium: {
    color: "#B34D4D",
    fontSize: 17,
    fontFamily: "Mulish_600SemiBold",
  },

  grayColor12Regular: {
    color: "#9E9E9E",
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
  },

  grayColor13Regular: {
    color: COLORS.black,
    fontSize: 13,
    fontFamily: "Mulish_400Regular",
  },

  grayColor14Regular: {
    color: "#9E9E9E",
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
  },

  grayColor15Regular: {
    color: "#9E9E9E",
    fontSize: 15,
    fontFamily: "Mulish_400Regular",
  },

  grayColor15Bold: {
    color: "#9E9E9E",
    fontSize: 15,
    fontFamily: "Mulish_400Regular",
    fontWeight: "bold",
  },

  yellowColor16Regular: {
    color: "#FFEB3B",
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
  },

  lightBlueColor15Regular: {
    color: "#2196F3",
    fontSize: 15,
    fontFamily: "Mulish_400Regular",
  },

  lightBlueColor16Regular: {
    color: "#2196F3",
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
  },

  redColor16Regular: {
    color: "#F44336",
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
  },

  redColor17Medium: {
    color: "#F44336",
    fontSize: 17,
    fontFamily: "Mulish_600SemiBold",
  },
};

export const styles = StyleSheet.create({
  loginscreen: {
    flex: 1,
    backgroundColor: "#EEF1FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    width: "100%",
  },
  loginheading: {
    fontSize: 26,
    marginBottom: 10,
  },
  logininputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logininput: {
    borderWidth: 1,
    width: "90%",
    padding: 8,
    // borderRadius: 2,
  },
  loginbutton: {
    backgroundColor: "green",
    padding: 12,
    marginVertical: 10,
    width: "60%",
    // borderRadius: "50%",
    elevation: 1,
  },
  loginbuttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  chatscreen: {
    backgroundColor: "#F7F7F7",
    flex: 1,
    padding: 10,
    position: "relative",
  },
  chatheading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
  chattopContainer: {
    backgroundColor: "#F7F7F7",
    height: 70,
    width: "100%",
    padding: 20,
    justifyContent: "center",
    marginBottom: 15,
    elevation: 2,
  },
  chatheader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatlistContainer: {
    paddingHorizontal: 10,
  },
  chatemptyContainer: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  chatemptyText: { fontWeight: "bold", fontSize: 24, paddingBottom: 30 },
  messagingscreen: {
    flex: 1,
  },
  messaginginputContainer: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  messaginginput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
  },
  messagingbuttonContainer: {
    width: "30%",
    backgroundColor: "green",
    // borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  modalbutton: {
    width: "40%",
    height: 45,
    backgroundColor: "green",
    // borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  modalbuttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modaltext: {
    color: "#fff",
  },
  modalContainer: {
    width: "100%",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    elevation: 1,
    height: 400,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  modalinput: {
    borderWidth: 2,
    padding: 15,
  },
  modalsubheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  mmessageWrapper: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  mmessage: {
    maxWidth: "50%",
    backgroundColor: "#f5ccc2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
  },
  mvatar: {
    marginRight: 5,
  },
  cchat: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    height: 80,
    marginBottom: 10,
  },
  cavatar: {
    marginRight: 15,
  },
  cusername: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  cmessage: {
    fontSize: 14,
    opacity: 0.7,
  },
  crightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  ctime: {
    opacity: 0.5,
  },
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    justifyContent: "space-between",
    borderBottomColor: "gray",
    borderBottomWidth: .2,
    // position: "absolute",
    // width: "75px"
    // borderBottomWidth: 1
    // borderBottomHe: 1
    // borderBottomEndRadius    
  },
  messageWrapStyle: {
    borderRadius: 10 - 5.0,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  bottomWrapStyle: {
    flexDirection: "row",
    marginBottom: 10 + 3.0,
    alignItems: "center",
    marginHorizontal: 10,
  },
  textFieldWrapStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.27)",
    borderRadius: 10,
    height: 50.0,
    justifyContent: "center",
    flex: 1,
    paddingLeft: 10,
  },
  sendAndAttachButtonStyle: {
    height: 44.0,
    width: 44.0,
    borderRadius: 22.0,
    backgroundColor: "rgba(255, 255, 255, 0.20)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  bottomSheetWrapStyle: {
    backgroundColor: "#fffff",
    margin: 10,
    borderRadius: 10,
    padding: 10 * 3.0,
  },
  attachmentOptionsWrapStyle: {
    borderRadius: 30.0,
    height: 60.0,
    width: 60.0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const Sizes = {
  fixPadding: 10.0,
};

export const Colors = {
  blackColor: "#000000",
  whiteColor: "#ffffff",
  primaryColor: "#B34D4D",
  grayColor: "#9E9E9E",
  bodyBackColor: "#FAFAFA",
  yellowColor: "#FFEB3B",
  lightBlueColor: "#2196F3",
  cyanColor: "#009688",
  redColor: "#F44336",
  purpleColor: "#9C27B0",
  orangeColor: "#FF9800",
  darkBlueColor: "#3F51B5",
};
