import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Home from "./Home";
import Search from "./Search";
import CartIsEmpty from "./CartIsEmpty";
import WishList from "./WishList";
import Profile from "./Profile";

import {
    HomeTab,
    SearchTab,
    WishListTab,
    ProfileTab,
    TabElement,
    Bag,
} from "../svg";
import { COLORS, FONTS, cartItems, products } from "../constants";

export default function MainLayout() {
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState("Home");

    const tabs = [
        {
            id: "1",
            screen: "Home",
            icon: (
                <HomeTab
                    color={
                        selectedTab == "Home" ? COLORS.golden : COLORS.lightGray
                    }
                />
            ),
        },
        {
            id: "2",
            screen: "Search",
            icon: (
                <SearchTab
                    color={
                        selectedTab == "Search"
                            ? COLORS.golden
                            : COLORS.lightGray
                    }
                />
            ),
        },
        {
            id: "3",
            screen: "Order",
            icon: (
                <View
                    style={{
                        width: 58,
                        height: 58,
                        borderWidth: 1,
                        borderColor: "#BBA36B",
                        top: -10,
                        borderRadius: 30,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            width: 54,
                            height: 54,
                            backgroundColor: COLORS.golden,
                            borderRadius: 30,

                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Bag />
                        <View
                            style={{
                                width: 18,
                                height: 18,
                                backgroundColor: COLORS.white,
                                borderRadius: 9,
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                                right: 10,
                                bottom: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 10,
                                    color: COLORS.golden,
                                    ...FONTS.Mulish_700Bold,
                                }}
                            >
                                5
                            </Text>
                        </View>
                    </View>
                </View>
            ),
        },
        {
            id: "4",
            screen: "WishList",
            icon: (
                <WishListTab
                    color={
                        selectedTab == "WishList"
                            ? COLORS.golden
                            : COLORS.lightGray
                    }
                />
            ),
        },
        {
            id: "5",
            screen: "Profile",
            icon: (
                <ProfileTab
                    color={
                        selectedTab == "Profile"
                            ? COLORS.golden
                            : COLORS.lightGray
                    }
                />
            ),
        },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.goldenTransparent_01 }}>
            {selectedTab == "Home" && <Home />}
            {selectedTab == "Search" && <Search />}
            {selectedTab == "Order" && <CartIsEmpty />}
            {selectedTab == "WishList" && <WishList />}
            {selectedTab == "Profile" && <Profile />}

            <View
                style={{
                    alignSelf: "center",
                    position: "absolute",
                    bottom: 68,
                }}
            >
                <TabElement />
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 28,
                    backgroundColor: COLORS.white,
                    paddingBottom: 10,
                }}
            >
                {tabs.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() =>
                                item.screen == "Order" && products.length !== 0
                                    ? navigation.navigate("Order")
                                    : setSelectedTab(item.screen)
                            }
                        >
                            {item.icon}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
