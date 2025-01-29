import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import Set from "./Set";
import { setType, setInputTypes, exerciseTypes } from "./workoutData";

const SetList = React.memo(
  ({
    sets,
    checked,
    logged,
    deleteSet,
    addSetBelow,
    updateSetValue,
    logSet,
  }: {
    sets: setType[];
    checked: exerciseTypes;
    logged: Record<string, boolean>;
    deleteSet: (setId: string) => void;
    addSetBelow: (setId: string) => void;
    updateSetValue: (
      setId: string,
      newValue: number,
      type: setInputTypes,
    ) => void;
    logSet: (setId: string) => void;
  }) => {
    return (
      <AnimatePresence>
        {sets.map((set) => {
          return (
            <motion.div
              layout
              key={`${set.id}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.2 }}
            >
              <Set
                set={set}
                checked={checked}
                logged={logged}
                deleteSet={() => deleteSet(set.id)}
                addSetBelow={() => addSetBelow(set.id)}
                updateSetValue={updateSetValue}
                logSet={() => logSet(set.id)}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    );
  },
  (prevProps, nextProps) => prevProps.sets === nextProps.sets,
);

export default SetList;
