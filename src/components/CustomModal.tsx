import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Modal, Portal, Surface } from 'react-native-paper';
import { colors } from '../config/colors';
import { theme } from '../config/theme';
import TextComponent from './Text';
import CustomButton from './CustomButton';

const { width } = Dimensions.get('window');

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  overview: string;
  rating: number;
  releaseDate?: string;
  language?: string;
  posterPath?: string;
  runtime: number;
  genres: string[];
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  overview,
  rating,
  releaseDate,
  language,
  posterPath,
  genres,
  runtime,
}) => {
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : undefined;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <Surface style={styles.modalContent} elevation={5}>
          {imageUrl && (
            <ImageBackground
              source={{ uri: imageUrl }}
              style={styles.posterBackground}
              imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
              blurRadius={2}
            />
          )}

          <ScrollView contentContainerStyle={styles.infoContainer}>
            <TextComponent
              text={title}
              color={colors.primary}
              style={styles.modalTitle}
            />

            {releaseDate && (
              <TextComponent
                text={`📅 Release: ${releaseDate}`}
                style={styles.modalText}
                color={colors.white}
              />
            )}
            {runtime && (
              <TextComponent
                text={`🕒 Runtime: ${runtime} min`}
                style={styles.modalText}
                color={colors.white}
              />
            )}
            {language && (
              <TextComponent
                text={`🌐 Language: ${language.toUpperCase()}`}
                style={styles.modalText}
                color={colors.white}
              />
            )}
            {genres?.length > 0 && (
              <TextComponent
                text={`🎬 Genres: ${genres.join(', ')}`}
                style={styles.modalText}
                color={colors.white}
              />
            )}

            <TextComponent
              text={`⭐ Rating: ${rating.toFixed(1)}`}
              style={styles.modalText}
              color={colors.white}
            />

            <TextComponent
              text={overview}
              style={styles.overviewText}
              color={colors.white}
            />

            <CustomButton
              text="Cerrar"
              onPress={onClose}
              color={colors.primary}
              textColor="#000"
              style={styles.closeButton}
            />
          </ScrollView>
        </Surface>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
  modalContent: {
    backgroundColor: colors.darkMode,
    borderRadius: 20,
    overflow: 'hidden',
    width: width * 0.9,
    maxHeight: '85%',
  },
  posterBackground: {
    width: '100%',
    height: 160,
  },
  infoContainer: {
    padding: 16,
  },
  modalTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.lg + 2,
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 26,
  },
  modalText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.md,
    marginBottom: 10,
    lineHeight: 22,
  },
  overviewText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.md,
    marginTop: 12,
    marginBottom: 10,
    lineHeight: 22,
    textAlign: 'justify',
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default CustomModal;
