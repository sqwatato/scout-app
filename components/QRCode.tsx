import BottomSheet from "@gorhom/bottom-sheet";
import React, {
  FC,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import QRCode from "react-native-qrcode-svg";
import { usePreGame, useAuton, useTeleop, usePostGame } from "../Stores";
import { AutonData, PostGameData, PreGameData, TeleopData } from "../types";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface QRCodeBottomSheetProps {
  sheetRef?: RefObject<BottomSheetMethods>;
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
}

type MatchData = AutonData & TeleopData & PostGameData & PreGameData;

const QRCodeBottomSheet: FC<QRCodeBottomSheetProps> = ({
  sheetRef,
  navigation,
}) => {
  const snapPoints = useMemo(() => [1, "75%"], []);

  const [showQR, setShowQR] = useState<boolean>(false);

  const preGameState = usePreGame((state) => state);
  const autonState = useAuton((state) => state);
  const teleopState = useTeleop((state) => state);
  const postGameState = usePostGame((state) => state);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) setShowQR(false);
    else setShowQR(true);
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("@scout_pregame", JSON.stringify(preGameState));
  }, [preGameState]);

  useEffect(() => {
    AsyncStorage.setItem("@scout_auton", JSON.stringify(autonState));
  }, [autonState]);

  useEffect(() => {
    AsyncStorage.setItem("@scout_teleop", JSON.stringify(teleopState));
  }, [teleopState]);

  useEffect(() => {
    AsyncStorage.setItem("@scout_postgame", JSON.stringify(postGameState));
  }, [postGameState]);

  const getData: () => MatchData = () => {
    return {
      alliance: preGameState.alliance,
      attemptHang: postGameState.attemptHang,
      attemptLevel: postGameState.attemptLevel,
      autonBottom: autonState.autonBottom,
      autonBottomMissed: autonState.autonBottomMissed,
      autonInner: autonState.autonInner,
      autonUpper: autonState.autonUpper,
      autonUpperMissed: autonState.autonUpperMissed,
      teleopBottom: teleopState.teleopBottom,
      teleopBottomMissed: teleopState.teleopBottomMissed,
      teleopInner: teleopState.teleopInner,
      teleopUpper: teleopState.teleopUpper,
      teleopUpperMissed: teleopState.teleopUpperMissed,
      buddy: postGameState.buddy,
      climbTime: postGameState.climbTime,
      comments: postGameState.comments,
      cycles: teleopState.cycles,
      defense: teleopState.defense,
      disabled: teleopState.disabled,
      hangFail: postGameState.hangFail,
      initLineCrosses: autonState.initLineCrosses,
      levelFail: postGameState.levelFail,
      matchNum: preGameState.matchNum,
      minfo: preGameState.minfo,
      preloads: autonState.preloads,
      regional: preGameState.regional,
      rotation: teleopState.rotation,
      stuck: teleopState.stuck,
      teamNum: preGameState.teamNum,
      teams: preGameState.teams,
      trench: teleopState.trench,
    };
  };

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      animateOnMount={false}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      style={{
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
        {showQR && (
          <QRCode
            value={JSON.stringify(getData())}
            size={Dimensions.get("screen").width / 1.3}
          />
        )}
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
            onPress={() => {
              sheetRef?.current?.close();
              // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
          >
            Continue Scout
          </Button>
          <Button
            status="danger"
            appearance="outline"
            style={{
              width: "100%",
            }}
            onPress={() => {
              navigation?.navigate("Home");
              // setVisible(true);
              // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            }}
          >
            Finish Scout
          </Button>
        </View>
      </View>
    </BottomSheet>
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

export default QRCodeBottomSheet;
