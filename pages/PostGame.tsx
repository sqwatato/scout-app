import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, View, Animated, Platform, Dimensions } from "react-native";
import { Layout, Button, Text, Radio, RadioGroup, Modal, Card } from "@ui-kitten/components";
import { MatchProps } from "./Match";
import Header from "../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import { useData } from "../context/DataContext";
import MatchStatefulToggle from "../components/MatchStatefulToggle";
import Section from "../components/Section";
import MatchStatefulStopwatch from "../components/MatchStatefulStopwatch";
import MatchStatefulCheckbox from "../components/MatchStatefulCheckbox";
import BottomSheet from "@gorhom/bottom-sheet";
import QRCode from "react-native-qrcode-svg";
import * as Haptics from "expo-haptics";

const PostGame: FC<MatchProps> = ({ matchInfo, navigation, settings }) => {
  const [headerBackgroundColor] = useState(new Animated.Value(0));
  const interpolateHeaderBackgroundColor = headerBackgroundColor.interpolate({
    inputRange: [0, 255],
    outputRange: ["#fff0", Platform.OS === "ios" ? "#aaf2" : "#aaf9"],
  });

  const [matchInfoState, setMatchInfoState] = useState(matchInfo);
  const { data, setData } = useData();
  const defaultHang = data
    ? !data.attemptHang
      ? 2
      : data.hangFail
      ? 1
      : 0
    : 2;
  const defaultLevel = data
    ? !data.attemptLevel
      ? 2
      : data.levelFail
      ? 1
      : 0
    : 2;
  useEffect(() => {
    setMatchInfoState(matchInfo);
  }, [matchInfo]);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [-25, "75%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [ visible, setVisible ] = useState( false );

  return (
    <Layout style={styles.container} level="1">
      <View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ zIndex: 0 }}>
          <Section headerPadding={120} headerTitle="Climb Time">
            <MatchStatefulStopwatch dataTitle="climbTime" name="Climb Time" />
          </Section>
          <Section headerTitle="Hang">
            <RadioGroupWrapper
              choices={["Success", "Fail", "Did not Attempt"]}
              defaultChoice={defaultHang}
              onDataChange={(index: number) => {
                if (index === 0)
                  setData({ ...data, attemptHang: true, hangFail: false });
                else if (index === 1)
                  setData({ ...data, attemptHang: true, hangFail: true });
                else setData({ ...data, attemptHang: false, hangFail: true });
              }}
            />
          </Section>
          <Section headerTitle="Level">
            <RadioGroupWrapper
              choices={["Success", "Fail", "Did not Attempt"]}
              defaultChoice={defaultLevel}
              onDataChange={(index: number) => {
                if (index === 0)
                  setData({ ...data, attemptLevel: true, levelFail: false });
                else if (index === 1)
                  setData({ ...data, attemptLevel: true, levelFail: true });
                else setData({ ...data, attemptLevel: false, levelFail: true });
              }}
            />
          </Section>
          <Section headerTitle="Solo Climb">
            <MatchStatefulCheckbox dataTitle="soloClimb" name="Solo Climb" />
          </Section>
          <Section>
            <Button onPress = { () => bottomSheetRef.current.expand()} >Finish Match and Create QRCode</Button>
          </Section>
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
        title="Post Game"
        matchInfo={matchInfoState}
        backgroundColor={interpolateHeaderBackgroundColor}
        toggleQRCode={() => bottomSheetRef.current.expand()}
        haptic={settings.haptic}
      />
    </Layout>
  );
};

type WrapperOptions = {
  choices: string[];
  defaultChoice: number;
  onDataChange: (index: number) => void;
};
const RadioGroupWrapper = ({
  choices,
  onDataChange,
  defaultChoice,
}: WrapperOptions) => {
  const [selectedIndex, setSelectedIndex] = React.useState(defaultChoice);

  return (
    <View>
      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index);
          onDataChange(index);
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {choices.map((choice) => (
          <Radio key={choice}>
            {(props) => (
              <Text
                {...props}
                style={{ fontSize: 16, fontWeight: "500", marginLeft: 10 }}
              >
                {choice}
              </Text>
            )}
          </Radio>
        ))}
      </RadioGroup>
    </View>
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
  startStopClimb: {
    flex: 1,
    alignItems: "center",
  },
  halfButton: {
    width: "50%",
  },
  buttonGroup: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "#fafafa",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PostGame;
