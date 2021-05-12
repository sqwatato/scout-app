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
import MatchStatefulCounter from "../components/MatchStatefulCounter";
import MatchStatefulToggle from "../components/MatchStatefulToggle";
import MatchStatefulCheckbox from "../components/MatchStatefulCheckbox";
import Section from "../components/Section";
import { useData } from "../context/DataContext";
import BottomSheet from "@gorhom/bottom-sheet";
import QRCode from "react-native-qrcode-svg";

const Teleop: FC<MatchProps> = ({ matchInfo, settings, navigation }) => {
  const [headerBackgroundColor] = useState(new Animated.Value(0));
  const interpolateHeaderBackgroundColor = headerBackgroundColor.interpolate({
    inputRange: [0, 255],
    outputRange: ["#fff0", Platform.OS === "ios" ? "#aaf2" : "#abf9"],
  });

  const [matchInfoState, setMatchInfoState] = useState(matchInfo);

  useEffect(() => {
    setMatchInfoState(matchInfo);
  }, [matchInfo]);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [-25, "75%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const { data } = useData();

  return (
    <Layout style={styles.container} level="1">
      <View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ zIndex: 0 }}>
          <ShotsInput auton={false} settings={settings} padding={120} />
          <Section headerTitle="Cycles">
            <MatchStatefulCounter
              name="Cycles"
              dataTitle="cycles"
              haptic={settings.haptic}
            />
          </Section>
          <Section headerTitle="Rotation Disabled">
            <MatchStatefulCheckbox
              dataTitle="rotationDisabled"
              name="Rotation Disabled"
            />
          </Section>
          <Section headerTitle="Position Disabled">
            <MatchStatefulCheckbox
              dataTitle="positionDisabled"
              name="Position Disabled"
            />
          </Section>
          <Section headerTitle="Trench">
            <MatchStatefulCheckbox dataTitle="trench" name="Trench" />
          </Section>
          <Section headerTitle="Defense">
            <MatchStatefulCheckbox dataTitle="defense" name="Defense" />
          </Section>
          <Section headerTitle="Stuck">
            <MatchStatefulCheckbox dataTitle="stuck" name="Stuck" />
          </Section>
          <Section headerTitle="Disabled">
            <MatchStatefulCheckbox dataTitle="disabled" name="Disabled" />
          </Section>
        </ScrollView>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{ zIndex: 100 }}
      >
        <View style={styles.contentContainer}>
          <Text style={{ marginBottom: 20 }}>
            Scan this QR Code with the Super Scout Scanner
          </Text>
          <QRCode
            value={JSON.stringify(data)}
            size={Dimensions.get("screen").width / 1.5}
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
        title="Teleop"
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

export default Teleop;
