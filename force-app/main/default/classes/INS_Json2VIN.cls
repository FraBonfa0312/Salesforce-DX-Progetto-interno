public class INS_Json2VIN {

    public class Vins {
		public String vin;
	}

	public class Meta {
		public List<Integer> codes;
		public List<Links> links;
	}

	public Data data;
	public Meta meta;

	public class Links {
	}

	public class Data {
		public List<Vins> vins;
	}

	
	public static INS_Json2VIN parse(String json) {
		return (INS_Json2VIN) System.JSON.deserialize(json, INS_Json2VIN.class);
	}
}