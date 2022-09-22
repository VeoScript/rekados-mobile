import React from 'react'
import MIcon from 'react-native-vector-icons/Octicons'
import FeIcon from 'react-native-vector-icons/Feather'

MIcon.loadFont()

type IconSizeProps = {
  iconSizes: keyof typeof IconSizes;
}

export interface IconProps {
  size: IconSizeProps['iconSizes'];
  name: string;
  color: string;
}

export const IconSizes = {
  small: 15,
  medium: 25,
  large: 30,
  extraLarge: 40,
  ultraLarge: 50
}

export const MaterialIcon = ({size, name, color}: IconProps) => (
  <MIcon name={name} size={IconSizes[size]} color={color} />
)

export const FeatherIcon = ({size, name, color}: IconProps) => (
  <FeIcon name={name} size={IconSizes[size]} color={color} />
)