const CLASS_FOCUS_KEYS = [
  "class-focus-activity",
  "class-focus-minutes",
  "class-focus-points",
  "class-focus-total-points",
  "class-focus-history",
  "class-focus-unlocked",
  "class-focus-equipped",
  "class-focus-house-items",
  "class-focus-music-volume",
];

const createClassroomSave = () => {
  const data = {};
  
  CLASS_FOCUS_KEYS.forEach((key) => {
    const value = localStorage.getItem(key);

    if (value !== null) {
      data[key] = JSON.parse(value)
    }
  })

  return {
    app: "Class Focus Friend",
    saveType: "classroom",
    version: 1,
    createdAt: new Date().toISOString(),
    data,
  };
}

const downloadClassroomData = () => {
  const save = createClassroomSave();
  
  const blob = new Blob(
    [JSON.stringify(save, null, 2)],
    { type: "application/json" }
  )

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a");

  link.href = url;
  link.download = `Focus-Friend-Classroom-Save-${new Date()
    .toISOString()
    .slice(0,10)}.json`;
  
    link.click()
    URL.revokeObjectURL(url);
}

const importClassroomData = (save) => {
  Object.entries(save.data).forEach(([key, value]) => {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  });
  window.location.reload()
}