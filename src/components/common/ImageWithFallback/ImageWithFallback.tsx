import { useState } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { IMAGE_BASE_URL } from '@/utils/constants';

// Берём все атрибуты <img>, КРОМЕ src (его считаем сами), и добавляем свои name/fallback.
interface ImageWithFallbackProps extends Omit<ComponentPropsWithoutRef<'img'>, 'src'> {
  name: string | null;   // имя файла из данных (может быть null)
  fallback: string;      // имя файла-заглушки
}

const ImageWithFallback = ({ name, fallback, ...props }: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  // Заглушка если файл не загрузился (404) ИЛИ имени нет (null)
  const fileName = hasError || !name ? fallback : name;

  return (
    <img
      {...props}                                       // className, alt и пр. — от вызывающего
      src={`${IMAGE_BASE_URL}${fileName}`}
      onError={() => setHasError(true)}                // 404 → переключаемся на заглушку
    />
  );
};

export default ImageWithFallback;