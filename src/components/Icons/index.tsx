import { IconAccount } from './icon-account';
import { IconCheck } from './icon-check';
import { IconClose } from './icon-close';
import { IconMenu } from './icon-menu';
import { IconRightArrow } from './icon-right-arrow';


interface Props {
  name: string;
  active?: boolean;
  width?: number;
  height?: number;
  color?: string;
}

export const Icons = ({ name, active, width, height, color }: Props) => {
  switch (name) {
    case 'menu':
      return <IconMenu active={active || false} color={color} width={width} height={height} />;
    case 'account':
      return <IconAccount active={active || false} color={color} width={width} height={height} />;
    case 'arrow-right':
      return <IconRightArrow active={active || false} color={color} width={width} height={height} />;
    case 'close':
      return <IconClose active={active || false} color={color} width={width} height={height} />;
    case 'check':
      return <IconCheck active={active || false} color={color} width={width} height={height} />;
    default:
      return null;
  }
};
