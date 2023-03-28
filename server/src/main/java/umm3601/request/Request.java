package umm3601.request;

import org.mongojack.Id;
import org.mongojack.ObjectId;

@SuppressWarnings({"VisibilityModifier"})

public class Request {
  @ObjectId @Id

  @SuppressWarnings({"MemberName"})

  public String _id;

  public String name; // The name of the person requesting the item(s).
  public String itemType;
  public String description;
  public String foodType;

  @Override
  public boolean equals(Object obj) {
    if (!(obj instanceof Request)) {
      return false;
    }
    Request other = (Request) obj;
    return _id.equals((other._id));
  }

  @Override
  public int hashCode() {
    return _id.hashCode();
  }

}
