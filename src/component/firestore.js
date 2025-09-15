// Convert normal object → Firestore REST "fields" format
export function toFirestoreFields(obj) {
  const fields = {};
    Object.keys(obj).forEach(key => {
        const value = obj[key];
            if (typeof value === "string") {
                  fields[key] = { stringValue: value };
                      } else if (typeof value === "number") {
                            fields[key] = { integerValue: value };
                                } else if (typeof value === "boolean") {
                                      fields[key] = { booleanValue: value };
                                          } else {
                                                fields[key] = { stringValue: JSON.stringify(value) };
                                                    }
                                                      });
                                                        return { fields };
                                                        }

                                                        // Convert Firestore REST document → normal JS object
                                                        export function fromFirestoreFields(doc) {
                                                          const obj = {};
                                                            if (!doc.fields) return obj;
                                                              Object.keys(doc.fields).forEach(key => {
                                                                  const field = doc.fields[key];
                                                                      if (field.stringValue !== undefined) obj[key] = field.stringValue;
                                                                          else if (field.integerValue !== undefined) obj[key] = parseInt(field.integerValue);
                                                                              else if (field.booleanValue !== undefined) obj[key] = field.booleanValue;
                                                                                  else obj[key] = null;
                                                                                    });
                                                                                      return obj;
                                                                                      }