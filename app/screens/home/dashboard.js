import React from 'react';
import {
  Pressable,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  PermissionsAndroid,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LineGraph from '@chartiful/react-native-line-graph';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import Images from '../image/images';

const screenWidth = Dimensions.get("window").width - 50;
const data = {
  labels: [],
  datasets: [
    {
      data: [40,20, 45, 28, 40, 52, 43],
      color: (opacity = 1) => '#F78808', 
      strokeWidth: 1
    }
  ],
  // legend: ["Rainy Days"] // optional
};

const DashboardScreen = ({ navigation }) => {

  return (
    <View style={styles.backgroundStyle}>
      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, width: '35%' }}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100, borderBottomWidth: 2, borderBottomColor: '#E7A257', }}>
              <Image
                style={{ width: 24, height: 24, resizeMode: 'contain', margin: 4 }}
                source={ Images.homeIcon }
              />
              <Text style={styles.screenTitleHeader}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('alerts')}
              style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100, marginLeft: 10, paddingTop: 3 }}>
              <Image
                style={{ width: 24, height: 24, resizeMode: 'contain', margin: 4 }}
                source={ Images.bellIcon }
              />
              <Text style={styles.screenTitleHeader}>Alerts</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('menu')}>
            <Image
              style={{ width: 40, height: 40, resizeMode: 'contain' }}
              source={ Images.rightLogo }
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignSelf: 'center',
            width: 350,
            alignItems: 'center',
          }}>
          <Text style={styles.screenTitleHeader}>Heart</Text>
                   

          <LineGraph
            data={[25, 22, 25, 21, 25,29,24]}
            width={320}
            height={240}
           isBezier
            hasLine
            lineColor='#F78808'
            hasShadow
            dotColor='#E08226'
            lineWidth={1}
            baseConfig={{
              startAtZero: true,
              hasXAxisBackgroundLines: false,
              hasXAxisLabels: false,
              hasYAxisLabels:false,

            }}
            style={{
              lineColor: '#fff',
              // marginTop: 30
              borderWidth:2,
              borderTopWidth:0,
              borderColor:'#156BB9',
              marginBottom:20,
            }}
          />

          <Image
            style={{ width: 250, height: 250, resizeMode: 'contain' }}
            source={ Images.circle }
          />
        </View>
        <View
          style={{
            margin: 20,
            width: 350,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    height: '100%'
  },
  screenTitleHeader: {
    fontSize: 24,
    color: '#08415C',
  },
  screenTitleHeaderUnderLine: {
    color: '#E7A257',
    textDecorationLine: 'underline',
    textDecorationColor: '#E7A257',
  },
  screenTitleSubHeader: {
    fontSize: 18,
    color: '#2F9BC1',
  },
  formFieldLabel: {
    marginTop: 20,
    marginBottom: 10,
    color: '#0E55A8',
    fontSize: 16,
  },
  formFieldTextView: {
    borderWidth: 2,
    borderColor: '#08415C',
    borderRadius: 15,
    fontSize: 16,
  },
  formFieldTextInput: {
    fontSize: 16,
    width: 300,
    marginLeft: 15,
  },
  primaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 10,
    borderRadius: 15,
    elevation: 3,
    width: 180,
    backgroundColor: '#E79532',
    borderColor: '#FFFFFF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },


});

export default DashboardScreen;