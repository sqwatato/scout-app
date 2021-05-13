import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, View, Animated, Platform, Dimensions } from "react-native";
import { Button, Card, Layout, Modal, Text } from "@ui-kitten/components";
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
import * as Haptics from "expo-haptics";

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

  const [ visible, setVisible ] = useState( false );

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
        style = {{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.36,
          shadowRadius: 6.68,

          elevation: 11,
        }}
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
              onPress={() => { bottomSheetRef.current.close(); Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Medium ) }}
            >
              Continue Scout
            </Button>
            <Button
              status="danger"
              appearance="outline"
              style={{
                width: "100%",
              }}
              onPress={() => { setVisible( true ); Haptics.notificationAsync( Haptics.NotificationFeedbackType.Error ) } }
            >
              Finish Scout
            </Button>
          </View>
        </View>
      </BottomSheet>
      <Modal
        visible={visible}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.6)',}}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true} style = {{ marginHorizontal: 25, paddingTop: 10, paddingBottom: 16 }}>
          <Text category = "h4" style = {{ textAlign: "center"}}>Are you sure you want to finish scouting?</Text>
          <Text category = "p1"  style = {{ textAlign: "center", marginVertical: 10, marginBottom: 15 }}>All match data will be lost</Text>
          <View style = {{ flexDirection: "row", marginTop: 10}}>
            <Button 
              onPress={() => { 
                setVisible(false); 
                navigation.navigate( "Home" ) 
                Haptics.notificationAsync( Haptics.NotificationFeedbackType.Error )
              }}
              appearance = "outline"
              // status = "danger"
              style = {{
                marginRight: 2,
                flex: 1
              }}
            >
              Yes
            </Button>
            <Button 
              // appearance = "outline"
              // status = "danger"
              style = {{
                marginLeft: 2,
                flex: 1
              }}
              onPress={() => { 
                setVisible(false); 
                Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Medium )
              }}
            >
              No
            </Button>
          </View>
        </Card>
      </Modal>

      <Header
        title="Auton"
        matchInfo={matchInfoState}
        backgroundColor={interpolateHeaderBackgroundColor}
        toggleQRCode={() => bottomSheetRef.current.expand()}
        haptic={settings.haptic}
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
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Auton;
