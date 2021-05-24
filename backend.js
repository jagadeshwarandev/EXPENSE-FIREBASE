function getDocuments() {
  db.collection("expenses")
    .orderBy("datetime", "desc")
    .onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
        // console.log(doc.id);
        if (doc.id === "total") {
          // console.log(doc.id);
          headingEl.textContent = "Total Expense: " + doc.data().total;
        } else {
          documents.push({
            ...doc.data(),
            docId: doc.id,
          });
        }

        renderlist(documents);
      });
    });

}

function deleteFromFirebase(docId, expense) {
  db.collection("expenses")
    .doc(docId)
    .delete()
    .then(() => {
      // console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
  db.collection("expenses")
    .doc("total")
    .update({
      total: firebase.firestore.FieldValue.increment(-expense),
    });
  
}

function addExpenseOnFirestore(textDesc, expense,datetime) {
  db.collection("expenses")
    .add({
      desc: textDesc,
      amount: expense,
      datetime: datetime,
    })
    .then((docRef) => {
      // console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  db.collection("expenses")
    .doc("total")
    .update({
      total: firebase.firestore.FieldValue.increment(expense),
    });
}
