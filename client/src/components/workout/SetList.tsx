import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import Set from "./Set";
import { setType, exerciseTypes, setInputTypes } from "./workoutData";

const SetList = React.memo(
  ({
    sets,
    changeSetValue,
    checked,
    logged,
    deleteSet,
    addSetBelow,
    logSet,
    edit,
    canceled,
    setEdit,
  }: {
    sets: setType[];
    changeSetValue: (setId: string, value: number, type: setInputTypes) => void;
    checked: exerciseTypes;
    logged: Record<string, boolean>;
    deleteSet: (setId: string) => void;
    addSetBelow: (setId: string) => void;
    logSet: (setId: string) => void;
    edit: boolean;
    canceled: boolean;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
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
                changeSetValue={changeSetValue}
                checked={checked}
                logged={logged}
                deleteSet={() => deleteSet(set.id)}
                addSetBelow={() => addSetBelow(set.id)}
                logSet={() => logSet(set.id)}
                edit={edit}
                canceled={canceled}
                makeEdit={() => setEdit(true)}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    );
  },
  (prevProps, nextProps) =>
    prevProps.sets === nextProps.sets && prevProps.logged === nextProps.logged,
);

export default SetList;
