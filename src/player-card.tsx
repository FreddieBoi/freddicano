import { Card, CardHeader, Body1Stronger, makeStyles } from "@fluentui/react-components";
import { Player } from "./use-tournaments"
import { PersonRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    width: '100%',
  }
});

export type PlayerCardProps = Player;

export const PlayerCard = (props: PlayerCardProps) => {
  const { name } = props;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        image={<PersonRegular />}
        header={<Body1Stronger>{name}</Body1Stronger>}
      />
    </Card>
  );
};
