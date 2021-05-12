import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, View, Animated, Platform, Dimensions } from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";
import { MatchProps } from "./Match";
import Header from "../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import ShotsInput from "../components/ShotsInput";
import Section from "../components/Section";
import MatchStatefulRadio from "../components/MatchStatefulRadio";
import MatchStatefulCounter from "../components/MatchStatefulCounter";
import MatchStatefulCheckbox from "../components/MatchStatefulCheckbox";
import BottomSheet from "@gorhom/bottom-sheet";
import QRCode from "react-native-qrcode-svg";
import { useData } from "../context/DataContext";

const Auton: FC<MatchProps> = ({ matchInfo, settings, navigation }) => {
  const [headerBackgroundColor] = useState(new Animated.Value(0));
  const interpolateHeaderBackgroundColor = headerBackgroundColor.interpolate({
    inputRange: [0, 255],
    outputRange: ["#fff0", Platform.OS === "ios" ? "#aaf2" : "#aaf9"],
  });

  const [matchInfoState, setMatchInfoState] = useState(matchInfo);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [-25, "75%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    setMatchInfoState(matchInfo);
  }, [matchInfo]);

  const { data } = useData();

  return (
    <Layout style={styles.container} level="1">
      <View>
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={{ zIndex: 0 }}
        >
          <Section headerTitle="Crossing" headerPadding={120}>
            <MatchStatefulCheckbox
              dataTitle="crossedInitLine"
              name="Crossed Initiation Line"
            />
          </Section>
          <Section headerTitle="Starting Location">
            <MatchStatefulRadio
              dataTitle="start"
              values={[1, 2, 3]}
              options={["Location 1", "Location 2", "Location 3"]}
            />
          </Section>
          <Section headerTitle="Preloads">
            <MatchStatefulCounter
              name="Preloads"
              dataTitle="preloads"
              haptic={settings.haptic}
            />
          </Section>
          <ShotsInput auton settings={settings} />
        </ScrollView>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text style={{ marginBottom: 20 }}>
            Scan this QR Code with the Super Scout Scanner
          </Text>
          <QRCode
            value={JSON.stringify(data)}
            size={Dimensions.get("screen").width / 1.3}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: Dimensions.get("screen").width / 1.5,
            }}
          >
            <Button
              style={{ width: "100%", marginVertical: 5 }}
              appearance="outline"
              onPressIn={() => bottomSheetRef.current.close()}
            >
              Continue Scout
            </Button>
            <Button
              status="danger"
              appearance="outline"
              style={{
                width: "100%",
              }}
              onPressIn={() => navigation.navigate("Home")}
            >
              Finish Scout
            </Button>
          </View>
        </View>
      </BottomSheet>
      <Header
        title="Auton"
        matchInfo={matchInfoState}
        backgroundColor={interpolateHeaderBackgroundColor}
        toggleQRCode={() => bottomSheetRef.current.expand()}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  dropdown: {
    width: "70%",
  },
  section: {
    marginVertical: 20,
  },
  contentContainer: {
    backgroundColor: "#fafafa",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Auton;
