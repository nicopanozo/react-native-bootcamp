import { SafeAreaView } from 'react-native-safe-area-context';
import CarouselComponent from '../components/Carousel';

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CarouselComponent />
    </SafeAreaView>
  );
};
export default Home;
